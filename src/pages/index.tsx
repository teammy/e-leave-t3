import React, {  useState } from "react";
import {Button} from '@nextui-org/react'
import {api} from '~/utils/api'

interface ArticleDetailsProps {
  id: number;
}


const ArticleDetails = ({ id}: ArticleDetailsProps) => {
  const { data:article,isLoading  } = api.article.byId.useQuery(id);

  if (isLoading) return <div>Loading...</div>;
  if (!article) return <div>No Content</div>;

  return (
    <ul>
      <li>{article.title}</li>
      <li>{article.content}</li>
      <li>{article.excerpt}</li>
    </ul>
  )
}


const IndexPage = () => {
  const utils = api.useContext();
  const list = utils.article.list;
  const [currentId,setCurrenId] = useState(-1);
  const { data:articles,isLoading } = api.article.list.useQuery();
  const { mutateAsync: addArticle } = api.article.add.useMutation({
    onSuccess() {
      list.invalidate();
    },
  });
  const { mutateAsync: updateArticle } = api.article.update.useMutation({
    onSuccess() {
      list.invalidate();
    },
  });
  const { mutateAsync: removeArticle } = api.article.remove.useMutation({
    onSuccess() {
      list.invalidate();
    },
  });

  const dateString = new Date().toISOString();

  const add = () => {
    addArticle({
      title: `Article ${dateString}`,
      content: `Article ${dateString} content`,
      excerpt: `Article ${dateString} excerpt`,
    });
  }
  const update = (id:number) => {
    updateArticle({
      id,
      data: {
        title: `Update Article ${dateString}`,
        content: `Update Article ${dateString} content`,
        excerpt: `Update Article ${dateString} excerpt`,
      },
    });
  }
  const remove = (id:number) => {
    removeArticle(id);
  }

  if(isLoading) return (<div>Loading...</div>);
  if(!articles) return (<div>No Content</div>);

  return (
     <div>
      <Button onClick={add} color="primary">Add </Button>
      <ul>
        {articles?.map((article) => (
          <li key={article.id} className="flex">
            <Button onClick={() => setCurrenId(article.id)}>Show Details</Button>
            <Button onClick={() => update(article.id)}>Edit</Button>
            <Button onClick={() => remove(article.id)}>Delete</Button>
            <h1>{article.title}</h1>
          </li>
        ))}
      </ul>
      {currentId !== -1 && <ArticleDetails id={currentId} />}
     </div>
     
  );
};

export default IndexPage;
