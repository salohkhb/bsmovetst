// Vehicle : { present: bool, item: { id: string, price: number, name: string, description: string } }
// Lift : { present: bool, item: { id: string, price: number, name: string, description: string } }
// Movers : { present: bool, quantity: number, unitPrice: number, price: number }
export function mapDataToAPi(data = {}) {
  const apiData = {
    totalPrice: data.totalPrice || 0,
    vehicle: data.vehicle || { present: false },
    lift: data.lift || { present: false },
    movers: data.movers || { present: false },
  };
  return apiData;
}
