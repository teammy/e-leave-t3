import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

// api.article.[list,create,update,delete]

interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
}

const articles: Article[] = [
  { id: 1, title: "Article 123", excerpt: "Excerpt 1", content: "Content 1" },
  { id: 2, title: "Article 24", excerpt: "Excerpt 2", content: "Content 2" },
  { id: 3, title: "Article 3", excerpt: "Excerpt 3", content: "Content 3" },
  { id: 4, title: "Article 48", excerpt: "Excerpt 4", content: "Content 4" },
  { id: 5, title: "Article 5", excerpt: "Excerpt 5", content: "Content 5" },
  {
    id: 6,
    title: "Article 6",
    excerpt: "Excerpt 6",
    content: "Contentdwadwa 5",
  },
];

export const articleRouter = createTRPCRouter({
  list: publicProcedure.query(() => {
    return articles;
  }),
  byId : publicProcedure.input(z.number()).query(({ input }) => {
    return articles.find((article) => article.id === input);
  }),
  
  add: publicProcedure
    .input(
      z.object({
        title: z.string(),
        excerpt: z.string(),
        content: z.string(),
      }),
    )
    .mutation(({ input }) => {
      const article = { id: articles.length + 1, ...input };
      articles.push(article);

      return article;
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        data: z
          .object({
            title: z.string(),
            excerpt: z.string(),
            content: z.string(),
          })
          .partial(),
      }),
    )
    .mutation(({ input }) => {
      const { id, data } = input;
      const article = articles.find((article) => article.id === id);

      if (!article) throw new TRPCError({ code: "NOT_FOUND" });

      if (data.title) article.title = data.title;
      if (data.excerpt) article.excerpt = data.excerpt;
      if (data.content) article.content = data.content;

      return article;
    }),

  remove: publicProcedure.input(z.number()).mutation(({ input }) => {
    const index = articles.findIndex((article) => article.id === input);
    articles.splice(index, 1);
  }),
});
