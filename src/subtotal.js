/**
 * Calculate the subtotal for an order (before discounts, delivery, tax)
 * 
 * @param {Object} order - The order object
 * @returns {number} - Subtotal in cents
 */
function subtotal(order) {
  if (!order || typeof order !== 'object') {
    throw new Error('Invalid order');
  }

  const items = order.items;
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error('Order must contain at least one item');
  }

  let total = 0;

  for (const item of order.items) {
    if (!item || typeof item !== 'object') {
      throw new Error('Order must contain at least one item');
    }

    const hasRequired = ('sku' in item) && ('title' in item) && ('qty' in item) && ('unitPriceCents' in item);
    if (!hasRequired) {
      throw new Error('Order must contain at least one item');
    }

    if (!Number.isInteger(item.qty) || item.qty <= 0) {
      throw new Error('Invalid order');
    }
    if (!Number.isInteger(item.unitPriceCents) || item.unitPriceCents < 0) {
      throw new Error('Invalid order');
    }
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
