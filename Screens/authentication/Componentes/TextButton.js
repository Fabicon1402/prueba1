import React from "react"
import{TouchableOpacity,Text} from "react-native"

const Boton = ({buttonContainerStyle,label,labelStyle,onPress})=>{
    return(


        <TouchableOpacity
            style={{
                alignItems:"center",
                justifyContent:"center",
                backgroundColor:"#f10569",
                ...buttonContainerStyle
            }}
            onPress={onPress}
        >   
            <Text 
                style={{
                    color:"white",
                    fontSize:18,
                    ...labelStyle
                }}
            >
                {label}
            </Text>

        </TouchableOpacity>
        
    )

}

export default Boton