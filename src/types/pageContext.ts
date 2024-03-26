import type { StateTree } from 'pinia'

// Szerver és kliens oldali állapotok átadására használ, ez a kezdő állapot amit a kliens használ
export interface PageContext {
  piniaInitialState: StateTree;
  statusCode: number; // HTTP válasz kód, az index.html ezzel a státusszal fog visszatérni
}
