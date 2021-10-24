import Command from '../../application/command/Command';
import Observer from './Observer';

export default class Publisher {
  observers: Observer[];

  constructor() {
    this.observers = [];
  }

  register(observer: Observer) {
    this.observers.push(observer);
  }

  /**
   * @desc optional implements RabbitMQ | Redis | Apache Kafka
   */
  publish(command: Command) {
    for (const observer of this.observers) {
      if (observer.operation === command.operation) {
        observer.notify(command);
      }
    }
  }
}
