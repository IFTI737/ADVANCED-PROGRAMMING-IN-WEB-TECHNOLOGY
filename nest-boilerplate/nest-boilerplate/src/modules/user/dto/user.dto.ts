import { IsNotEmpty , IsOptional } from "class-validator";



export class creatUserDto{

    @IsNotEmpty()
    name! : string;

    @IsNotEmpty()
    email! : string;

    @IsNotEmpty()
    password! : string;

    @IsOptional()
    created_at! : Date;

    @IsOptional()
    updated_at! : Date;
}

export class updateUserDto{

    @IsNotEmpty()
    name! : string;

    @IsNotEmpty()
    email! : string;

    @IsNotEmpty()
    password! : string;

    @IsOptional()
    created_at! : Date;

    @IsOptional()
    updated_at! : Date;
    @IsOptional()
    id! : string;
}