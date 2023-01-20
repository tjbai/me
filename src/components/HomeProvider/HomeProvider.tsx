import { createContext, ReactNode, useContext, useState } from "react";

export interface PostType {
  title: string;
  body: string;
  createdDate: string;
  key: string;
  state: "published" | "draft";
}

interface SelectedPostInterface {
  selectedPost: PostType | null;
  setSelectedPost: (val: PostType | null) => void;
  verboseDates: boolean;
  setVerboseDates: (val: boolean) => void;
  menuOpen: boolean;
  setMenuOpen: (val: boolean) => void;
}

const SelectedPostContext = createContext({} as SelectedPostInterface);

const HomeProvider = ({ children }: { children: ReactNode }) => {
  const [selectedPost, setSelectedPost] = useState<PostType | null>(null);
  const [verboseDates, setVerboseDates] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <SelectedPostContext.Provider
      value={{
        selectedPost,
        setSelectedPost,
        verboseDates,
        setVerboseDates,
        menuOpen,
        setMenuOpen,
      }}
    >
      {children}
    </SelectedPostContext.Provider>
  );
};

const useHome = () => useContext(SelectedPostContext);

export default HomeProvider;
export { useHome };
