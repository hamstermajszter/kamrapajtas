import { Injectable } from '@angular/core';

export interface DisplayQuantity {
  value: number;
  unit: string;
  formatted: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuantityDisplayService {

  /**
   * Converts quantity to a more readable format if applicable
   * Rules:
   * - Only convert if result has max 1 decimal place
   * - g to kg: if >= 1000g and divisible by 100
   * - ml to l: if >= 1000ml and divisible by 100
   */
  getDisplayQuantity(quantity: number, unit: string): DisplayQuantity {
    const originalFormatted = this.formatNumber(quantity) + unit;

    // Conversion rules
    const conversions = [
      {
        from: 'g',
        to: 'kg',
        factor: 1000,
        minValue: 1000,
        divisor: 100 // Must be divisible by 100 for clean conversion
      },
      {
        from: 'ml',
        to: 'l',
        factor: 1000,
        minValue: 1000,
        divisor: 100
      }
    ];

    for (const conversion of conversions) {
      if (unit === conversion.from && quantity >= conversion.minValue) {
        const convertedValue = quantity / conversion.factor;

        // Check if conversion results in max 1 decimal place
        if (this.hasMaxOneDecimal(convertedValue) && quantity % conversion.divisor === 0) {
          return {
            value: convertedValue,
            unit: conversion.to,
            formatted: this.formatNumber(convertedValue) + conversion.to
          };
        }
      }
    }

    // No conversion applied, return original
    return {
      value: quantity,
      unit: unit,
      formatted: originalFormatted
    };
  }

  /**
   * Check if number has maximum 1 decimal place
   */
  private hasMaxOneDecimal(num: number): boolean {
    const decimalPart = num % 1;
    if (decimalPart === 0) return true; // Integer

    // Check if has only 1 decimal place
    const rounded = Math.round(num * 10) / 10;
    return Math.abs(num - rounded) < 0.0001; // Account for floating point precision
  }

  /**
   * Format number for display (remove unnecessary decimals)
   */
  private formatNumber(num: number): string {
    // Remove trailing zeros and unnecessary decimal point
    return num % 1 === 0 ? num.toString() : num.toFixed(1).replace(/\.0$/, '');
  }

  /**
   * Get examples of conversions for testing
   */
  getConversionExamples(): Array<{input: {quantity: number, unit: string}, output: DisplayQuantity}> {
    const testCases = [
      { quantity: 1500, unit: 'g' }, // Should convert to 1,5kg
      { quantity: 1000, unit: 'g' }, // Should convert to 1kg
      { quantity: 2500, unit: 'g' }, // Should convert to 2,5kg
      { quantity: 1506, unit: 'g' }, // Should NOT convert (1,506kg)
      { quantity: 1200, unit: 'ml' }, // Should convert to 1,2l
      { quantity: 1250, unit: 'ml' }, // Should NOT convert (1,25l has 2 decimals conceptually)
      { quantity: 500, unit: 'g' },   // Should NOT convert (below threshold)
      { quantity: 2, unit: 'db' }     // Should NOT convert (no conversion rule)
    ];

    return testCases.map(testCase => ({
      input: testCase,
      output: this.getDisplayQuantity(testCase.quantity, testCase.unit)
    }));
  }
}
