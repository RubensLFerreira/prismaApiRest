import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
  async findAllUsers(req, res) {
    try {
      const users = await prisma.user.findMany();
      return res.json(users);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async findUser(req, res) {
    try {
      const { id } = req.params;
      const user = await prisma.user.findUnique({ where: { id: Number(id) } });

      if (!user) {
        return res
          .status(404)
          .json({ error: "Não foi posível encontrar este usuário!" });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async createUser(req, res) {
    try {
      const { name, email } = req.body;
      let user = await prisma.user.findUnique({ where: { email } });

      if (user) {
        return res
          .status(404)
          .json({ error: "Já existe um usuário com este email." });
      }

      user = await prisma.user.create({
        data: { name, email },
      });
      res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name, email } = req.body;

      let user = await prisma.user.findUnique({ where: { id: Number(id) } });

      if (!user) {
        res
          .status(404)
          .json({ error: "Não foi possível encontrar este usuário!" });
      }

      user = await prisma.user.update({
        where: { id: Number(id) },
        data: { name, email },
      });

      return res.status(200).json("Usuário atualizado com sucesso!");
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await prisma.user.findUnique({ where: { id: Number(id) } });

      if (!user)
        return res
          .status(404)
          .json({ error: "Não possivel encotrar esse usuario" });

      await prisma.user.delete({ where: { id: Number(id) } });

      return res.status(200).json({ message: "Usuario deletado" });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
}