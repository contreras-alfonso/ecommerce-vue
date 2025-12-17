import type { ProductResponse } from 'src/types/product-response';
import type { ProductTable } from 'src/types/product-table';

export class ProductMapper {
  static mapProductResponseToProductTable(product: ProductResponse): ProductTable {
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

  static mapProductToProductTableArray(products: ProductResponse[]) {
    return products.map((product) => this.mapProductResponseToProductTable(product));
  }
}
