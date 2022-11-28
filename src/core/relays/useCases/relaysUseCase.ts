import { Relay,RelayPolicy } from "../domain";
import { RelayPoolRepository } from '../domain/ports';
import { RelayPoolImpl } from "../infraestructure/relayPool";


interface RelayUseCases{
  addRelay(url: string, policy: RelayPolicy | undefined):void
  listRelays():Relay[]
}



export class RelaysUseCasesImpl implements RelayUseCases {
  
  relayRepo:RelayPoolRepository 
  constructor(){

    this.relayRepo= RelayPoolImpl.Repostory

  }



  listRelays(): Relay[] {
   
    return this.relayRepo.listRelays()
    
   
  }


  addRelay(url: string, policy: RelayPolicy | undefined): void {
    const relay: Relay = {
      url,
      policy: !policy
        ? {
            read: true,
            write: true,
          }
        : policy,
    };
    this.relayRepo.addRelay(url);
  }

  
  


}
