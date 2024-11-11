import { useRouter } from 'expo-router';
import React from 'react'
import { Text, View, Image, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';

export default function MenuCard({date, menuForDate, isCurrentDate} : any) {
    const router = useRouter()
    

    return (
    <View className='flex-row gap-5 m-2 w-full justify-between'>
          <View className=
          {`${isCurrentDate ? "bg-black": ""} p-2 rounded-2xl justify-center items-center`}>
            <Text
            className={`font-bold text-lg ${isCurrentDate ? "text-white " : "text-black"}`}
            >
              {date.format("DD")}
            </Text>
            <Text 
                className={`font-medium text-sm ${isCurrentDate ? "text-white " : "text-black"}`}>
              {date.format("ddd")}
            </Text>
          </View>

          <TouchableOpacity 
          onPress={() => {
            router.push({ pathname : '/(tabs)/MenuScreen', params: { date: date.format('ddd') + ' ' + date.format('DD')} })
          }}
          className=' bg-red-300 rounded-xl p-4 w-5/6'>
            {
              menuForDate ? 
              <View>
              {/* <Text>Meal Plan</Text> 
              {menuForDate?.items.filter(item => item.mealType === "breakfast")
              .map((item, index) => (
                <Text>{item.name}</Text>
              ))} */}
              </View>

              :
            //   <Text>There is no menu</Text>
            <View className='flex-col bg-slate-600'>
                <View className="flex p-2 justify-center w-full">
                    <Text className='text-center font-bold'>Breakfast</Text>
                </View>
                <Text>Staple</Text>
                <Text>Sandwich</Text>
            </View>
            }
          </TouchableOpacity>
        </View>
  )
}