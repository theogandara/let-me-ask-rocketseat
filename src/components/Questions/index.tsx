import { ReactNode } from "react";
import cx from "classnames";
import "./style.scss";

type QuestionsProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
  isHighligted?: boolean;
  isAnswered?: boolean;
};

export function Question({
  content,
  author,
  children,
  isHighligted = false,
  isAnswered = false,
}: QuestionsProps) {
  return (
    <div
      className={cx(
        "question",
        { answered: isAnswered },
        { highligted: isHighligted && !isAnswered }
      )}
    >
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>{children}</div>
      </footer>
    </div>
  );
}
