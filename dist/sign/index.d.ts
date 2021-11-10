import { Web3Provider } from '@ethersproject/providers';
import { Space, Proposal, CancelProposal, Vote } from './types';
export declare const domain: {
    name: string;
    version: string;
};
export default class Client {
    readonly address: string;
    constructor(address?: string);
    sign(web3: Web3Provider, address: string, message: any, types: any): Promise<unknown>;
    send(envelop: any): Promise<unknown>;
    space(web3: Web3Provider, address: string, message: Space): Promise<unknown>;
    proposal(web3: Web3Provider, address: string, message: Proposal): Promise<unknown>;
    cancelProposal(web3: Web3Provider, address: string, message: CancelProposal): Promise<unknown>;
    vote(web3: Web3Provider, address: string, message: Vote): Promise<unknown>;
}
