import { services } from "@/lib/site-config";

export const paystackCurrency = process.env.PAYSTACK_CURRENCY || "NGN";

const serviceAmounts: Record<string, number> = {
  "self-service": 25000,
  "wash-fold": 15000,
  "dry-cleaning": 50000,
  commercial: 100000,
};

export function getServiceAmount(serviceId: string) {
  return serviceAmounts[serviceId] || 0;
}

export function getServiceTitle(serviceId: string) {
  return services.find((service) => service.id === serviceId)?.title || serviceId;
}
