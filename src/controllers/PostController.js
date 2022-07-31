import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
  async findAllPosts(req, res) {
    try {
      const posts = await prisma.post.findMany({
        select: {
          // exemplo de filtragem
          id: true,
          content: true,
          userId: true,
        },
      });
      return res.status(200).json(posts);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async createPost(req, res) {
    const { content } = req.body;
    const { id } = req.params;

    try {
      const user = await prisma.user.findUnique({ where: { id: Number(id) } });

      if (!user) {
        return res.status(404).json({ message: "Usuário inexistente!" });
      }

      const post = await prisma.post.create({
        data: {
          content,
          userId: user.id,
        },
        include: {
          author: true,
        },
      });
      return res.status(200).json(post);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async updatePost(req, res) {
    const { id } = req.params;
    const { content } = req.body;
    try {
      const post = await prisma.post.findUnique({ where: { id: id } });

      if (!post) {
        return res.status(404).json({ message: "Post inexistente" });
      }

      await prisma.post.update({
        where: { id: Number(id) },
        data: { content },
      });

      return res.json({ message: "Post atualizado com sucesso!" });
    } catch (error) {
      return res.json({ message: error.message });
    }
  },

  async deletePost(req, res) {
    try {
      const { id } = req.params;
      const post = await prisma.post.findUnique({ where: { id: Number(id) } });

      if (!post) {
        res.status(404).json({ error: "Este post não existe!" });
      }

      await prisma.post.delete({ where: { id: Number(id) } });
      return res.status(200).json({ message: "Post deletado com sucesso!" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
}