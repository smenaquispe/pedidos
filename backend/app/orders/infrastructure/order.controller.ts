import { Request, Response } from "express-serve-static-core";
import { GetOrder } from "../application/get.order";
import { MakeOrder } from "../application/make.order";
import { MakeOrderStructure } from "../application/make.order.interface";

export class OrderController {
    constructor(
        private getOrder : GetOrder,
        private makeOrder : MakeOrder
    ) {}

    async getOrderByAttributes (req : Request, res : Response) {
        try {
            const {numberOrder} = req.body
            const order = await this.getOrder.run(numberOrder)
            res.status(200).send(order)
        } catch (error) {
            const messageError = JSON.stringify({'error' : error})
            console.log(messageError)
            res.send(messageError)
        }
    }

    async makeAnOrder (req : Request, res : Response) {
        try {
            const data = req.body
            const structure : MakeOrderStructure = {...data}
            const response = await this.makeOrder.run(structure)
            res.status(200).send(response)
        } catch (error) {
            const messageError = JSON.stringify({'error' : error})
            console.log(messageError)
            res.send(messageError)
        }
    }
}