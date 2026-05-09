import { buildElectronApp } from "@/setup/electron";
import { buildExpoApp } from "@/setup/expo";
import { buildExpressApp } from "@/setup/express";
import { buildNextApp } from "@/setup/nextjs";
import { buildViteApp } from "@/setup/vite";
import type{ pkgmanager,framework } from "@/types/common";
export type execFunc = (pkgmanager:pkgmanager)=> void
export const mapper:Record<framework,execFunc> = {
  nextjs: buildNextApp,
  vite:buildViteApp,
  express:buildExpressApp,
  electron:buildElectronApp,
  expo:buildExpoApp,
}