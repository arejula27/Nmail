import {RelayPool,Relay as NRelay, RelayPolicy}  from "nostr-tools"

type Relay = {url:string,policy:RelayPolicy}



type relayService =  RelayPool 

export type {relayService,Relay}