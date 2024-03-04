import { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import CategoryCard from "./CategoryCard";
import sanityClient, { urlFor } from "../sanity/client";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `
    *[_type=="category"]
    `
      )
      .then((data) => setCategories(data));
  }, []);

  return (
    <ScrollView
      horizontal
      contentContainerStyle={{
        paddingVertical: 10,
        paddingHorizontal: 15,
      }}
      showsHorizontalScrollIndicator={false}
    >
      {/* Category cards */}
      {categories?.map((category) => (
        <CategoryCard
          key={category._id}
          imgUrl={urlFor(category.image).url()}
          title={category.name}
        />
      ))}
    </ScrollView>
  );
}
