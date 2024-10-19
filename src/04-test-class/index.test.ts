// Uncomment the code below and write your tests
import lodash from 'lodash';
import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  BankAccount,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  const initialBalance = 9000;
  let bankAccount: BankAccount;

  beforeEach(() => {
    bankAccount = getBankAccount(initialBalance);
  });

  test('should create account with initial balance', () => {
    expect(bankAccount.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const withdrawAmount = initialBalance * 2;

    expect(() => bankAccount.withdraw(withdrawAmount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const destinationAccount = getBankAccount(initialBalance);
    const transferAmount = initialBalance * 2;

    expect(() =>
      bankAccount.transfer(transferAmount, destinationAccount),
    ).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => bankAccount.transfer(initialBalance, bankAccount)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const resultedBalance = initialBalance + initialBalance;

    bankAccount.deposit(initialBalance);
    expect(bankAccount.getBalance()).toBe(resultedBalance);
  });

  test('should withdraw money', () => {
    const resultedBalance = initialBalance - initialBalance;

    bankAccount.withdraw(initialBalance);
    expect(bankAccount.getBalance()).toBe(resultedBalance);
  });

  test('should transfer money', () => {
    const destinationAccount = getBankAccount(initialBalance);
    const fromAccountResultedBalance = initialBalance - initialBalance;
    const toAccountResultedBalance = initialBalance + initialBalance;

    bankAccount.transfer(initialBalance, destinationAccount);

    expect(bankAccount.getBalance()).toBe(fromAccountResultedBalance);
    expect(destinationAccount.getBalance()).toBe(toAccountResultedBalance);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balance = 50;

    jest
      .spyOn(lodash, 'random')
      .mockReturnValueOnce(balance)
      .mockReturnValueOnce(1);

    const fetchedBalance = await bankAccount.fetchBalance();

    expect(fetchedBalance).toBe(balance);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const balance = 50;

    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValueOnce(balance);

    await bankAccount.synchronizeBalance();

    expect(bankAccount.getBalance()).toBe(balance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValueOnce(null);

    await expect(bankAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
