import{ Subjects, Publisher, PaymentCreatedEvent} from '@yeebaytickets/common';

export class PaymentsCreatedPublisher extends Publisher<PaymentCreatedEvent>{

    subject: Subjects.PaymentCreated = Subjects.PaymentCreated
}