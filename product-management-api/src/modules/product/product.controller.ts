import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  ValidationPipe,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto, UpdateProductDto } from "./dto/product.dto";

@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts() {
    return await this.productService.getProducts();
  }

  @Get(":id")
  async getProductById(@Param("id", ParseUUIDPipe) id: string) {
    return await this.productService.getProductById(id);
  }

  @Post()
  async createProduct(@Body(ValidationPipe) dto: CreateProductDto) {
    return await this.productService.createProduct(dto);
  }

  @Patch(":id")
  async updateProduct(
    @Param("id", ParseUUIDPipe) id: string,
    @Body(ValidationPipe) dto: UpdateProductDto,
  ) {
    return await this.productService.updateProduct(id, dto);
  }

  @Delete(":id")
  async deleteProduct(@Param("id", ParseUUIDPipe) id: string) {
    return await this.productService.deleteProduct(id);
  }
}
