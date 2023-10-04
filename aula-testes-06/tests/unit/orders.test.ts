import { faker } from "@faker-js/faker";

import { createOrder, getOrderByProtocol } from "../../src/order-service";
import * as orderRepository from "../../src/order-repository";
import { OrderInput } from "../../src/validator";

describe("Order Service", () => {
  it("should create order", async () => {
    const orderData: OrderInput = { client: faker.person.fullName(), description: faker.commerce.product() };
    const order = await createOrder(orderData);
    expect(order).toEqual({ protocol: expect.any(String), status: "IN_PREPARATION" });
  });

  it("should return order based on protocol", async () => {
    const protocolData: { protocol: string, status: string } = { protocol: new Date().getTime().toString(), status: "IN_PREPARATION" };
    jest.spyOn(orderRepository, "getByProtocol").mockImplementationOnce((): any => { return protocolData });
    const order = await getOrderByProtocol(protocolData.protocol);
    expect(order).toEqual(protocolData);
  });

  it("should return INVALID as status when protocol does not exist", async () => {
    jest.spyOn(orderRepository, "getByProtocol").mockImplementationOnce((): any => { return undefined });
    const nonExistentProtocol = '1234567890';
    const order = await getOrderByProtocol(nonExistentProtocol);
    expect(order).toEqual({ protocol: nonExistentProtocol, status: 'INVALID' });
  });
});