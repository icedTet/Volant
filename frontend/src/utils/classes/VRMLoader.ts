import { VRM, VRMLoaderPlugin, VRMUtils } from "@pixiv/three-vrm";
import localforage from "localforage";
import { EventEmitter } from "events";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export type ModelData = {
  name: string;
  id: string;
  favorite?: boolean;
};
export class VRMLoader extends EventEmitter {
  static instance: VRMLoader;
  static getInstance(): VRMLoader {
    if (!VRMLoader.instance) {
      VRMLoader.instance = new VRMLoader();
    }
    return VRMLoader.instance;
  }
  modelMap: Map<string, VRMFile>;
  modelDataMap: Map<string, ModelData>;
  selectedModel?: string;
  ready?: boolean;
  private constructor() {
    super();
    this.modelMap = new Map();
    this.cacheLoad();
  }
  async cacheLoad() {
    console.log("cacheLoad");
    const models = (await localforage.getItem("models")) as Map<
      string,
      ModelData
    >;
    const selectedModel = (await localforage.getItem(
      "selectedModel"
    )) as string;
    if (selectedModel) this.selectedModel = selectedModel;
    await Promise.all(
      Array.from(models.values()).map(async (modelData) => {
        const { name, id } = modelData;
        const model = (await localforage.getItem(`models.${id}`)) as Blob;
        this.load(URL.createObjectURL(model), name, id);
      })
    );
    this.ready = true;
    this.emit("ready");
  }
  load(url: string, name: string, id: string) {
    console.log("load");
    const model = new VRMFile(url, name, id);
    this.modelMap.set(id, model);
    return model;
  }
  async addModelData(modelData: ModelData, blob: Blob) {
    console.log("addModelData");
    const { id } = modelData;
    this.modelDataMap.set(id, modelData);
    await localforage.setItem(`models.${id}`, blob);
    await localforage.setItem("models", this.modelDataMap);
  }
  getModels() {
    console.log("getModels");
    return this.modelMap;
  }
  getModel(id: string) {
    console.log("getModel");
    return this.modelMap.get(id);
  }
  getPrimaryModel() {
    console.log("getPrimaryModel");
    return this.modelMap.get(this.selectedModel);
  }
  async setPrimaryModel(id: string) {
    console.log("setPrimaryModel");
    if (this.modelDataMap.has(id)) return false;
    this.selectedModel = id;
    localforage.setItem("selectedModel", id);
    this.emit("primaryModelChanged", id);
  }
  async deleteModel(id: string) {
    console.log("deleteModel");
    URL.revokeObjectURL(this.modelMap.get(id)?.url);
    this.modelMap.delete(id);
    this.modelDataMap.delete(id);
    localforage.removeItem(`models.${id}`);
    // deleteObjectURL
    await localforage.setItem("models", this.modelDataMap);
  }
}
export class VRMFile extends EventEmitter {
  model?: VRM;
  gltf?: GLTF;
  url: string;
  name: string;
  id: string;

  constructor(url: string, name: string, id: string) {
    super();
    this.url = url;
    this.name = name;
    this.id = id;
    this.loadVRM();
  }
  async loadVRM() {
    const loader = new GLTFLoader();
    loader.register((parser) => new VRMLoaderPlugin(parser));
    const gltf = await loader.loadAsync(this.url);
    const vrm = gltf.userData.vrm as VRM;
    VRMUtils.removeUnnecessaryJoints(gltf.scene);
    this.model = vrm;
    this.gltf = gltf;
    this.emit("loaded", vrm);
    return vrm;

    //   loader.load(
    //     this.url,
    //     (gltf) => {
    //         VRM.from(gltf).then((vrm) => {
    //       const vrm = gltf.userData.vrm as THREE.Group;
    //       VRMUtils.removeUnnecessaryJoints(gltf.scene);
    //       this.model = vrm;
    //       resolve(vrm);
    //         }
    //     },
    //     this.onProgress.bind(this),
    //     this.onError.bind(this)
    //   );
  }
  async getVRM() {
    if (!this.model) {
      while (!this.model) {
        await new Promise((resolve) => setTimeout(resolve, 10));
      }
      return this.model;
    }
  }
  async getGLTF() {
    if (!this.gltf) {
      while (!this.gltf) {
        await new Promise((resolve) => setTimeout(resolve, 10));
      }
      return this.gltf;
    }
  }
  onProgress(progress: { loaded: number; total: number }) {
    this.emit("progress", progress);
  }
  onError(error: Error) {
    this.emit("error", error);
  }
}