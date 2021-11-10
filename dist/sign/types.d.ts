export interface Space {
    space: string;
    timestamp: number;
    settings: string;
}
export interface Proposal {
    space: string;
    timestamp: number;
    type: string;
    title: string;
    body: string;
    choices: string[];
    start: number;
    end: number;
    snapshot: number;
    network: string;
    strategies: string;
    plugins: string;
    metadata: string;
}
export interface CancelProposal {
    space: string;
    timestamp: number;
    proposal: string;
}
export interface Vote {
    space: string;
    timestamp: number;
    proposal: string;
    type: string;
    choice: number | number[] | string;
    metadata: string;
}
export declare const spaceTypes: {
    Space: {
        name: string;
        type: string;
    }[];
};
export declare const proposalTypes: {
    Proposal: {
        name: string;
        type: string;
    }[];
};
export declare const cancelProposalTypes: {
    CancelProposal: {
        name: string;
        type: string;
    }[];
};
export declare const voteTypes: {
    Vote: {
        name: string;
        type: string;
    }[];
};
export declare const voteArrayTypes: {
    Vote: {
        name: string;
        type: string;
    }[];
};
export declare const voteStringTypes: {
    Vote: {
        name: string;
        type: string;
    }[];
};
