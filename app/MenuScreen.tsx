import { View, Text, SafeAreaView, Pressable, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Feather } from '@expo/vector-icons';
import axios from 'axios';

export default function MenuScreen() {
  const { date, items } = useLocalSearchParams();
  // const date = params.date;
  const [option, setOption] = useState("")
  const [type, setType] = useState("")
  const [dishName, setDishName] = useState("");
  const [menuItems, setMenuItems] = useState([])
  const router = useRouter();



  useEffect(() => {
    if (items) {
      var obj = JSON.parse(items);
      setMenuItems(obj)
    }
  }, [items])

  useEffect(() => {
    console.log(menuItems)
  }, [menuItems])

  const AddDish = async () => {
    const dish = {
      date: date,
      name: dishName,
      type: type,
      mealType: option
    };
    console.log("Add dish called")
    const response = await axios.post(
      'http://localhost:3000/menu/addDish',
      dish
    );
    console.log("Response")
    
    const updateMenuItems = [...menuItems, dish];
    setMenuItems(updateMenuItems);

    console.log("dish added", response.data)

    setDishName("")
    setOption("")
    setType("")

    

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
            onPress={() => setOption("breakfast")}
            className={`${option == "breakfast" ? 'bg-teal-500' : 'bg-stone-200'} p-4 rounded-2xl`}>
            <Text className={`${option == "breakfast" ? 'text-white font-bold' : 'text-zinc-400'}`}>Breakfast</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setOption("lunch")}
            className={`${option == "lunch" ? 'bg-teal-500' : 'bg-stone-200'} p-4 rounded-2xl`}>
            <Text className={`${option == "lunch" ? 'text-white font-bold' : 'text-zinc-400'}`}>Lunch</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setOption("dinner")}
            className={`${option == "dinner" ? 'bg-teal-500' : 'bg-stone-200'} p-4 rounded-2xl`}>
            <Text className={`${option == "dinner" ? 'text-white font-bold' : 'text-zinc-400'}`}>Dinner</Text>
          </TouchableOpacity>


        </View>
        {

        menuItems.length > 0 ?
        <View className='w-full bg-stone-200 rounded-2xl p-5'>
          {
            Array.isArray(menuItems) && menuItems.some(item => item.mealType === 'breakfast') &&
            (
              <View>
                <Text className='font-bold text-sm mb-2'>Breakfast</Text>
              </View>
            )
          }

          {
            Array.isArray(menuItems) && menuItems.filter(item => item.mealType === 'breakfast')
              .map((item, index) => (
                <View>
                  {/* <View className="flex p-2 justify-center w-full">
                  <Text className='text-center font-bold'>{item.mealType}</Text>
                </View> */}
                  <View className='flex-row items-center gap-4 mt-3'>
                    <View className='bg-teal-500 p-2 rounded-2xl'>
                      <Text className='  text-white capitalize'>{item.type}</Text>
                    </View>
                    <Text>{item.name}</Text>
                  </View>
                </View>
              ))
          }

          {
            Array.isArray(menuItems) && menuItems.some(item => item.mealType === 'lunch') &&
            (
              <View>
                <Text className='font-bold text-sm mt-4'>Lunch</Text>
              </View>
            )
          }

          {
            Array.isArray(menuItems) && menuItems.filter(item => item.mealType === 'lunch')
              .map((item, index) => (
                <View>
                  <View className='flex-row items-center gap-4  mt-3'>
                    <View className='bg-teal-500 p-2 rounded-2xl'>
                      <Text className='  text-white capitalize'>{item.type}</Text>
                    </View>
                    <Text>{item.name}</Text>
                  </View>
                </View>
              ))
          }

          {
            Array.isArray(menuItems) && menuItems.some(item => item.mealType === 'dinner') &&
            (
              <View>
                <Text className='font-bold text-sm mt-4'>Dinner</Text>
              </View>
            )
          }

          {
            Array.isArray(menuItems) && menuItems.filter(item => item.mealType === 'dinner')
              .map((item, index) => (
                <View>
                  <View className='flex-row items-center gap-4 mt-3' >
                    <View className='bg-teal-500 p-2 rounded-2xl'>
                      <Text className='  text-white capitalize'>{item.type}</Text>
                    </View>
                    <Text>{item.name}</Text>
                  </View>
                </View>
              ))
          }
        </View>

        :
           (
            <View className='w-full h-52 bg-stone-200 rounded-2xl p-3'>
              <Text className='font-bold text-center'>There is no menu</Text>
            </View>
          )
        }




        <View className='flex-row gap-3'>
          <TouchableOpacity
            onPress={() => setType("staple")}
            className={`${type == "staple" ? 'bg-teal-400' : 'bg-zinc-300'} p-2 rounded-2xl`} >
            <Text className={`${type == "staple" ? 'text-white' : 'bg-zinc-300'}`}>Staple</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setType("main")}
            className={`${type == "main" ? 'bg-teal-400' : 'bg-zinc-300'} p-2 rounded-2xl`} >
            <Text className={`${type == "main" ? 'text-white' : 'bg-zinc-300'}`}>Main</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setType("side")}
            className={`${type == "side" ? 'bg-teal-400' : 'bg-zinc-300'} p-2 rounded-2xl`} >
            <Text className={`${type == "side" ? 'text-white' : 'bg-zinc-300'}`}>Side</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setType("soup")}
            className={`${type == "soup" ? 'bg-teal-400' : 'bg-zinc-300'} p-2 rounded-2xl`} >
            <Text className={`${type == "soup" ? 'text-white' : 'bg-zinc-300'}`}>Soup</Text>
          </TouchableOpacity>
        </View>

        {

          option === "" || type === "" ?
            <View className='flex justify-center mt-5' >
              <Text className='text-gray-400 text-center'>
                {option === "" ? "Select meal type" :
                  type === "" ? "Select type" : ""}
              </Text>
            </View>
            :
            <View className='flex-row justify-between'>
              <TextInput
                onChangeText={(text) => setDishName(text)}
                className='border border-zinc-400 w-5/6 rounded-2xl p-2'
                placeholder='Add dish here' />
              <TouchableOpacity
                onPress={AddDish}
                className='bg-black p-4 rounded-2xl'>
                <Text className='text-white font-bold'>Add</Text>
              </TouchableOpacity>
            </View>
        }


      </View>

    </SafeAreaView>
  )
}