import express, { NextFunction, Request, Response } from 'express';
import { readdir, lstat } from 'fs/promises';
import https from 'https';
import cors from 'cors';
import { join } from 'path';
const server = express();
server.use(cors());
server.use(express.json());
