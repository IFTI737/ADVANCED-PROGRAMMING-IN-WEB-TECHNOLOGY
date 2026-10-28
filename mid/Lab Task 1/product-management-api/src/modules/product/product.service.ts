import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "./entities/product.entity";
import { CreateProductDto, UpdateProductDto } from "./dto/product.dto";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getProducts() {
    try {
      const products = await this.productRepository.find();
      return products;
    } catch (error) {
      throw error;
    }
  }

  async getProductById(id: string) {
    try {
      const product = await this.productRepository.findOne({ where: { id } });
      if (!product) {
        throw new NotFoundException("Product with ID not found");
      }
      return product;
    } catch (error) {
      throw error;
    }
  }

  async createProduct(dto: CreateProductDto) {
    try {
      const response = this.productRepository.create(dto);
      return await this.productRepository.save(response);
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(id: string, dto: UpdateProductDto) {
    try {
      const product = await this.productRepository.findOne({ where: { id } });
      if (!product) {
        throw new NotFoundException("Product with ID not found");
      }
      Object.assign(product, dto);
      return await this.productRepository.save(product);
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(id: string) {
    try {
      const product = await this.productRepository.findOne({ where: { id } });
      if (!product) {
        throw new NotFoundException("Product with ID not found");
      }
      await this.productRepository.delete({ id });
      return { message: "Product deleted successfully", id };
    } catch (error) {
      throw error;
    }
  }
}
