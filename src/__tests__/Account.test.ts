import AccountApplicationService from '../application/service/AccountApplicationService';
import AccountRepositoryMemory from '../infra/repository/AccountRepositoryMemory';
import CreditHandler from '../domain/handler/CreditHandler';
import DebitHandler from '../domain/handler/DebitHandler';
import TransferHandler from '../domain/handler/TransferHandler';
import Publisher from '../infra/queue/Publisher';

let service: AccountApplicationService;

beforeEach(() => {
  const publisher = new Publisher();
  const accountRepository = new AccountRepositoryMemory();
  publisher.register(new CreditHandler(accountRepository));
  publisher.register(new DebitHandler(accountRepository));
  publisher.register(new TransferHandler(accountRepository));
  service = new AccountApplicationService(publisher, accountRepository);
});

test('Deve criar uma conta', () => {
  service.create('111.111.111-11');
  const account = service.get('111.111.111-11');
  expect(account.getBalance()).toBe(0);
});

test('Deve criar uma conta e fazer crédito', () => {
  service.create('111.111.111-11');
  service.credit('111.111.111-11', 1000);
  const account = service.get('111.111.111-11');
  expect(account.getBalance()).toBe(1000);
});

test('Deve criar uma conta e fazer um débito', () => {
  service.create('111.111.111-11');
  service.credit('111.111.111-11', 1000);
  service.debit('111.111.111-11', 500);
  const account = service.get('111.111.111-11');
  expect(account.getBalance()).toBe(500);
});

test('Deve criar duas conta e fazer uma transferência', () => {
  service.create('111.111.111-11');
  service.credit('111.111.111-11', 1000);
  service.create('222.222.222-22');
  service.credit('222.222.222-22', 500);
  service.transfer('111.111.111-11', '222.222.222-22', 700);
  const accountFrom = service.get('111.111.111-11');
  const accountTo = service.get('222.222.222-22');
  expect(accountFrom.getBalance()).toBe(300);
  expect(accountTo.getBalance()).toBe(1200);
});
