import { Injectable } from '@nestjs/common';
import { creatUserDto } from './dto/user.dto';
import { updateUserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()

export class UserService {

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

    async getUsers()
    {
        try{
            const user = await this.userRepository.find();
            return user;
        }
        catch(error){
            throw error;
        }
    }


    async creatUser(dto : creatUserDto)
    {
        try{
            const newUser = await this.userRepository.create(dto);
            await this.userRepository.save(newUser);
            return newUser;
        }
        catch(error){
            throw error;
        }
    }

    async updateUser(dto : updateUserDto)
    {
        try{
            const user = await this.userRepository.findOne({ where: { id: dto.id } });
            if (!user) {
                throw new Error('User not found');
            }
            const updatedUser = await this.userRepository.merge(user, dto);
            await this.userRepository.save(updatedUser);
            return updatedUser;
        }
        catch(error){
            throw error;
        }
    }


    async deleteUser(id : string)
    {
        try{
            const user = await this.userRepository.findOne({ where: { id } });
            if (!user) {
                throw new Error('User not found');
            }
            await this.userRepository.remove(user);
        }
        catch(error){
            throw error;
        }
    }

}