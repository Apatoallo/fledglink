import React, { Component } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { colors, fonts } from "../../configs/config";

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  title: {
    fontFamily: fonts.regular,
    fontSize: 18,
    color: colors.black
  },
  description: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.warmGrey,
    marginBottom: 20
  }
});

const categories = [
  {
    name: "LGBTQ",
    description:
      "LGBTQ is an initialism which stands for Lesbian, Gay, Bisexual, Transgender and Queer. This badge gives an insight into what a company does to promote inclusivity of individuals who identify with the LGBTQ community in their organisation."
  },
  {
    name: "BAME",
    description:
      "BAME is an initialism which stands for Black, Asian and Minority Ethnic. This badge gives an insight into what a company does to be inclusive of individuals in their organisation who identify as BAME."
  },
  {
    name: "Disability",
    description:
      "Find out more about what an organisation does to address structural, cultural, organisational and attitudinal barriers to inclusion of individuals with a mental or physical disability."
  },
  {
    name: "Female",
    description:
      "Learn more about what an organisation does to support equal opportunity for women within the workplace and what they are doing to actively close the gender pay gap."
  },
  {
    name: "i<society>™",
    description:
      "Why should anyone be at a disadvantage to improve their social mobility because of what they have? Find out what an organisation does to support individuals whose financial or personal situation is an obstacle to them gaining worthwhile employment."
  },
  {
    name: "Con:ect™",
    description:
      "If you have a spent criminal conviction, find out more about what the company does to be inclusive and re-integrate individuals with working life."
  }
];

class DiversityCategories extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        {categories.map(category => (
          <View>
            <Text style={styles.title}>{category.name}</Text>
            <Text style={styles.description}>{category.description}</Text>
          </View>
        ))}
      </ScrollView>
    );
  }
}

export default DiversityCategories;
