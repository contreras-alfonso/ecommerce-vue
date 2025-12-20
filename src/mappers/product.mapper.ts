import type { Product } from 'src/types/product';
import type { ProductTable } from 'src/types/product-table';

export class ProductMapper {
  static mapProductToProductTable(product: Product): ProductTable {
    return {
      id: product.brand.id,
      name: product.name,
      brandName: product.brand.name,
      categoryName: product.category.name,
      createdAt: product.createdAt,
      updateAt: product.updatedAt,
      colorImage: product.colorImages[0]!,
    };
  }

  static mapProductToProductTableArray(products: Product[]) {
    return products.map((product) => this.mapProductToProductTable(product));
  }
}
