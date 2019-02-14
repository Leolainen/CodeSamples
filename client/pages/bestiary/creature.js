// import { withRouter } from "next/router";
// import Link from "next/link";
// import React from "react";

// import BestiaryData from "../../database/bestiary.json";
// import Layout from "../../components/Layout";

// const Creature = withRouter(props => {
//   const sidebarData = BestiaryData.map(creature => (
//     <Link
//       key={creature.id}
//       href={`/bestiary/creature?species=${creature.species}`}
//     >
//       <a>{creature.species}</a>
//     </Link>
//   ));

//   const speciesQuery = props.router.query.species;
//   const selectedCreature = BestiaryData.find(creature => {
//     return creature.species === speciesQuery;
//   });

//   return (
//     <Layout sidebarData={[...sidebarData]}>
//       <h1>{speciesQuery}</h1>
//       <h2>{selectedCreature.species}</h2>
//       <h3>{selectedCreature.img}</h3>
//       <p>This is the blog post content.</p>
//     </Layout>
//   );
// });

// export default Creature;
