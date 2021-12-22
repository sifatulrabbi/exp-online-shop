import { Controller, Get, Post, Body, Put, Param, Delete } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller({ version: "1", path: "users" })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<IUserView> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<IUserView[]> {
    return this.usersService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<IUserView> {
    const user = await this.usersService.findOne({ id });
    return user.trimmedUser;
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto): Promise<IUserView> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string): Promise<string> {
    return this.usersService.remove(id);
  }
}
