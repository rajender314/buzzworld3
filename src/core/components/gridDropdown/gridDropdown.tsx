import React, {
  useState,
  forwardRef,
  useEffect,
  useImperativeHandle
} from "react";
import {FilterColumnProps} from "src/services/schema/schema";
import {PiDropdownMenu} from "pixel-kit";
import {DropdownDiv} from "src/core/components/gridDropdown/gridDropdown.component";

// const MakeSelector = (props: any, ref: any) => {
//   const options = ["Toyota", "Porche", "Ford"];
//   console.log(props.value);

//   let [make, setMake] = useState(props.value);

//   // useImperativeHandle(ref, () => {
//   //   return {
//   //     getValue() {
//   //       return make;
//   //     }
//   //   };
//   // });

//   const handleMakeChange = (e: any) => {
//     // console.log(e, "from handleMakeChange");
//     make = e.name;
//     setMake(make);
//     setEditing(false);
//   };

//   const [editing, setEditing] = useState(true);
//   useEffect(() => {
//     console.log(222, props);
//     // if (!editing) {
//     //   console.log("stop editing");
//     //   props.api.stopEditing();
//     // }
//   }, [editing]);

//   return (
//     <>
//       <DropdownDiv>
//         <PiDropdownMenu
//           items={[
//             {
//               id: 1,
//               name: "Active"
//             },
//             {
//               id: 2,
//               name: "InActive"
//             }
//           ]}
//           label={make}
//           onOpenChange={e => handleMakeChange(e)}
//         />
//       </DropdownDiv>
//       {/* <select
//         onChange={e => handleMakeChange(e)}
//         className="browser-default custom-select"
//       >
//         {options.map(make => (
//           <option key={make} value={make}>
//             {make}
//           </option>
//         ))}
//       </select> */}
//     </>
//   );
// };

const MakeSelector = forwardRef((props, ref) => {
  // console.log(props);
  let [make, setMake] = useState("Active");
  

  useImperativeHandle(ref, () => {
    return {
      getValue() {
        return make;
      }
    };
  });

  const handleMakeChange = (e: FilterColumnProps) => {
    console.log(e);
    
    setMake(e.name);
    setEditing(false);

    // if (e.id == 1) {
    //   setValue("true");
    // } else {
    //   setValue("false");
    // }
  };

  const [editing, setEditing] = useState(true);
  useEffect(() => {
    if (!editing) {
      console.log("stop editing");
      // props.api.stopEditing();
    }
  }, [editing]);

  return (
    <DropdownDiv>
      <PiDropdownMenu
        items={[
          {
            id: 1,
            name: "Active"
          },
          {
            id: 2,
            name: "InActive"
          }
        ]}
        label={make}
        onOpenChange={e => handleMakeChange(e)}
      />
    </DropdownDiv>
    // <select
    //   onChange={e => handleMakeChange(e)}
    //   className="browser-default custom-select"
    // >
    //   {options.map(make => (
    //     <option key={make} value={make}>
    //       {make}
    //     </option>
    //   ))}
    // </select>
  );
});
export { MakeSelector };
