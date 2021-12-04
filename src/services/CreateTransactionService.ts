import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(transaction: Transaction): Transaction {
    const { total } = this.transactionsRepository.getBalance();

    if (transaction.type === 'outcome' && total < transaction.value)
      throw new Error('your outcome is bigger than your income');

    this.transactionsRepository.create(transaction);
    return transaction;
  }
}

export default CreateTransactionService;
