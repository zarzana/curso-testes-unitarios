import { generateProtocolForPacient } from "protocols-generator";

jest.mock("uuid", () => {
  return { v4: () => { return "valor simulado no mock" } }
});

describe("Protocol generation", () => {
  it("should return a protocol", async () => {
    const protocolData: { name: string, lastName: string, priority: boolean } = { name: 'Bob', lastName: 'Bobson', priority: true };
    const protocol = generateProtocolForPacient(protocolData.name, protocolData.lastName, protocolData.priority);
    expect(protocol).toEqual({
      priority: protocolData.priority,
      date: expect.any(Date),
      pacient: `${protocolData.name} ${protocolData.lastName}`,
      protocol: expect.any(String),
    });
  });
});