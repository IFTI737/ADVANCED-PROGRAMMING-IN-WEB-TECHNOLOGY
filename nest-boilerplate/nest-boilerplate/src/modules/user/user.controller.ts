import { Controller , Get , Post , Body, Param , Delete, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { creatUserDto, updateUserDto } from './dto/user.dto';



@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Get()
    async getUsers()
    {
        return await this.userService.getUsers();

    }

    @Post()

    async creatUser(@Body() dto : creatUserDto)
    {
        return await this.userService.creatUser(dto);
    }

    @Patch(":id") 
    async updateUser(@Param('id') id : string, @Body() dto : updateUserDto)
    {
        return await this.userService.updateUser({ ...dto, id });
    }

    @Delete(':id')
    async deleteUser(@Param('id') id : string)
    {
        return await this.userService.deleteUser(id);
    }



}