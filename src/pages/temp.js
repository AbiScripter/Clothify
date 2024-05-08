// import { onAuthStateChanged } from "firebase/auth";
// import React, { useEffect, useState } from "react";
// import { auth, db } from "../firebase";
// import { collection, getDocs, onSnapshot } from "firebase/firestore";
// import { addToKids, addToMen, addToWomen } from "../slices/productsSlice";
// import { useDispatch } from "react-redux";

// const Temp = () => {
//   const dispatch = useDispatch();
//   const [data, setData] = useState([]);
//   useEffect(() => {
//     const fetchData = async () => {
//       const querySnapshot = await getDocs(collection(db, "products"));
//       const temp = [];
//       querySnapshot.forEach((doc) => {
//         // doc.data() is never undefined for query doc snapshots
//         temp.push({ id: doc.id, ...doc.data() });
//       });
//       setData(temp);
//     };
//     fetchData();
//   }, []);
//   console.log(data);

//   const menProducts = data.filter((pro) => pro.category === "m");
//   const womenProducts = data.filter((pro) => pro.category === "w");
//   const kidsProducts = data.filter((pro) => pro.category === "k");

//   console.log(menProducts, womenProducts, kidsProducts);
//   return (
//     <div>
//       {data.map((pro) => {
//         return (
//           <div key={pro.name}>
//             <p>
//               {pro.name},{pro.price}
//             </p>
//             <img src={pro.imageUrl} alt="product" />
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default Temp;
