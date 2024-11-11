import { View, Text, SafeAreaView, Pressable, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Feather } from '@expo/vector-icons';
import axios from 'axios';

export default function MenuScreen() {
  const params = useLocalSearchParams();
  const date = params.date;
  const [ option, setOption] = useState("")
  const [ type, setType] = useState("")
  const [dishName, setDishName] = useState("");
  const [ menuItems, setMenuItems] = useState([])
  const router = useRouter();

  const AddDish = async () => {
    const dish = {
      date: date, 
      name: dishName,
      type: type,
      mealType: option 
    };

    const response = await axios.post(
      'http://localhost:3000/menu/addDish',
      dish
    );
    const updateMenuItems = [...menuItems, dish];
    setMenuItems(updateMenuItems);

    console.log("dish added", response.data)

  }
  
  return (
    <SafeAreaView>
      <View className='p-4 gap-5'>

      <View className='flex-row justify-between'>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={25} />
        </TouchableOpacity>
      <Text>{date}</Text>
        <Feather name="trash" size={25} />
      </View>

      <View className='flex-row justify-center gap-5 mt-10'>
        <TouchableOpacity 
        onPress={()=> setOption("breakfast")}
        className={`${option == "breakfast" ? 'bg-teal-500' : 'bg-stone-200'} p-4 rounded-2xl`}>
          <Text className={`${option == "breakfast" ? 'text-white font-bold' : 'text-zinc-400'}`}>Breakfast</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        onPress={()=> setOption("lunch")}
        className={`${option == "lunch" ? 'bg-teal-500' : 'bg-stone-200'} p-4 rounded-2xl`}>
          <Text className={`${option == "lunch" ? 'text-white font-bold' : 'text-zinc-400'}`}>Lunch</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        onPress={()=> setOption("dinner")}
        className={`${option == "dinner" ? 'bg-teal-500' : 'bg-stone-200'} p-4 rounded-2xl`}>
          <Text className={`${option == "dinner" ? 'text-white font-bold' : 'text-zinc-400'}`}>Dinner</Text>
        </TouchableOpacity>

        
      </View>

      <View className='w-full h-52 bg-stone-200 rounded-2xl p-3'>
        <Text>There is no menu</Text>
      </View>

      <View className='flex-row gap-3'>
        <TouchableOpacity 
        onPress={()=> setType("staple")}
        className={`${type == "staple" ? 'bg-teal-400' : 'bg-zinc-300' } p-2 rounded-2xl`} >
          <Text className={`${type == "staple" ? 'text-white' : 'bg-zinc-300' }`}>Staple</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        onPress={()=> setType("main")}
        className={`${type == "main" ? 'bg-teal-400' : 'bg-zinc-300' } p-2 rounded-2xl`} >
          <Text className={`${type == "main" ? 'text-white' : 'bg-zinc-300' }`}>Main</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        onPress={()=> setType("side")}
        className={`${type == "side" ? 'bg-teal-400' : 'bg-zinc-300' } p-2 rounded-2xl`} >
          <Text className={`${type == "side" ? 'text-white' : 'bg-zinc-300' }`}>Side</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        onPress={()=> setType("soup")}
        className={`${type == "soup" ? 'bg-teal-400' : 'bg-zinc-300' } p-2 rounded-2xl`} >
          <Text className={`${type == "soup" ? 'text-white' : 'bg-zinc-300' }`}>Soup</Text>
        </TouchableOpacity>
      </View>

      <View className='flex-row justify-between'>
        <TextInput 
        onChangeText={(text)=> setDishName(text)}
        className='border border-zinc-400 w-5/6 rounded-2xl p-2'
        placeholder='Add dish here'/>
        <TouchableOpacity 
        onPress={() => AddDish()}
        className='bg-black p-4 rounded-2xl'>
          <Text className='text-white font-bold'>Add</Text>
          </TouchableOpacity>
      </View>

      </View>

    </SafeAreaView>
  )
}