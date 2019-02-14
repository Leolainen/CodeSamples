// import { withRouter } from "next/router";
// import Link from "next/link";
// import React from "react";

// import Layout from "../../components/Layout";

// import styles from "./style.scss";

// const bestiary = withRouter(props => {
// const sidebarData = BestiaryData.monsters.map(creature => (
//   <Link key={creature.id} href={`/bestiary?species=${creature.species}`}>
//     <a>{creature.species}</a>
//   </Link>
// ));

// const speciesQuery = props.router.query.species;
// const selectedCreature = BestiaryData.monsters.find(creature => {
//   return creature.species === speciesQuery;
// });

// const noCreatureLayout = () => {
//   return (
//     <div className={styles.noCreatureLayout}>
//       <h1>No creature selected</h1>
//     </div>
//   );
// };

// const creatureProfileLayout = () => {
//   return (
//     <div className={styles.creatureProfileLayout}>
//       <h1>{speciesQuery}</h1>
//       <h2>{selectedCreature.species}</h2>
//       <h3>{selectedCreature.img}</h3>
//       <p>This is the blog post content.</p>
//     </div>
//   );
// };

// return (
//   <Layout sidebarData={[...sidebarData]}>
//     Bestiary page
//     {selectedCreature ? creatureProfileLayout() : noCreatureLayout()}
//   </Layout>
// );

// return (
//   <Layout >
//     <Query query={BESTIARY_QUERY}>
//       {({ loading, error, data }) => {
//         loading && <h4>Loading...</h4>;
//         error && console.log(error);

//         return <h1>test</h1>;
//       }}
//     </Query>
//   </Layout>
// );
// });

// export default bestiary;
