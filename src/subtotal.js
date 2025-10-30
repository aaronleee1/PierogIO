/**
 * Calculate the subtotal for an order (before discounts, delivery, tax)
 * 
 * @param {Object} order - The order object
 * @returns {number} - Subtotal in cents
 * - subtotal(order) >= 0 for any valid order.
 * - subtotal(order) is an integer number of cents.
 * - increasing any item's qty (keeping other fields equal) never decreases subtotal.
 * - multiplying every item's qty by n multiplies subtotal by n.
 * - reordering items does not change subtotal.
 * - subtotal(orderA + orderB) == subtotal(orderA) + subtotal(orderB) when concatenating item lists.
 * - removing an add-on from an item never increases subtotal.
 * - invalid shapes (null order, missing items array, non-array addOns, non-string addOn entries,
 *               missing qty/unitPriceCents, non-integer qty/unitPriceCents) should throw.
 */
function subtotal(order) {
  let total = 0;

  for (const item of order.items) {
    // Base item cost
    let itemCost = item.unitPriceCents * item.qty;

    // Add-ons cost (per pack)
    if (item.addOns && item.addOns.length > 0) {
      const addOnPrices = {
        'sour-cream': 99,
        'fried-onion': 149,
        'bacon-bits': 199
      };
      for (const addOn of item.addOns) {
        itemCost += addOnPrices[addOn] * item.qty;
      }
    }

    total += itemCost;
  }

  return total;
}

module.exports = { subtotal };
