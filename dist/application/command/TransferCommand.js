"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TransferCommand {
    constructor(accountDocumentFrom, accountDocumentTo, amount) {
        this.accountDocumentFrom = accountDocumentFrom;
        this.accountDocumentTo = accountDocumentTo;
        this.amount = amount;
        this.operation = 'transfer';
    }
}
exports.default = TransferCommand;
