import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

export default function MenuCard({
  date,
  menuForDate,
  isCurrentDate,
  onDeletePressed,
}: any) {
  const router = useRouter();
  const CreateMeal = ({ type, name }: any) => {
    return (
      <View className="flex-row items-center gap-4 mt-4">
        <View className="bg-teal-500 p-2 rounded-2xl">
          <Text className="  text-white capitalize">{type}</Text>
        </View>
        <Text>{name}</Text>
      </View>
    );
  };

  return (
    <View className="flex-row gap-5 m-2 w-full justify-between">
      <View
        className={`${
          isCurrentDate ? "bg-green-500" : "bg-white"
        } p-2 rounded-2xl justify-center items-center`}
      >
        <Text
          className={`font-bold text-lg ${
            isCurrentDate ? "text-white " : "text-black"
          }`}
        >
          {date.format("DD")}
        </Text>
        <Text
          className={`font-medium text-sm ${
            isCurrentDate ? "text-white " : "text-black"
          }`}
        >
          {date.format("ddd")}
        </Text>
      </View>
      {menuForDate && (
        <TouchableOpacity
          onPress={() => onDeletePressed(menuForDate)}
          className="w-6 absolute right-5 top-5 z-10"
        >
          <Feather name="trash" size={18} />
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={() => {
          router.push({
            pathname: "/MenuScreen",
            params: {
              date: date.format("ddd") + " " + date.format("DD"),
              items: JSON.stringify(menuForDate?.items),
            },
          });
        }}
        className="bg-stone-200 rounded-xl p-4 w-5/6"
      >
        {menuForDate ? (
          <View>
            <View className="flex-col  ">
              {menuForDate.items.some(
                (item: { mealType: string }) => item.mealType == "breakfast"
              ) && (
                <View className="flex p-2 justify-center w-full">
                  <Text className="text-center font-bold">Breakfast</Text>
                </View>
              )}

              {menuForDate.items
                .filter(
                  (item: { mealType: string }) => item.mealType == "breakfast"
                )
                .map((item: { type: any; name: any }, index: any) => (
                  <CreateMeal key={index} type={item.type} name={item.name} />
                ))}

              {menuForDate.items.some(
                (item: { mealType: string }) => item.mealType == "lunch"
              ) && (
                <View className="flex p-2 justify-center w-full">
                  <Text className="text-center font-bold">Lunch</Text>
                </View>
              )}

              {menuForDate.items
                .filter(
                  (item: { mealType: string }) => item.mealType == "lunch"
                )
                .map((item: { type: any; name: any }, index: any) => (
                  <CreateMeal key={index} type={item.type} name={item.name} />
                ))}

              {menuForDate.items.some(
                (item: { mealType: string }) => item.mealType == "dinner"
              ) && (
                <View className="flex p-2 justify-center w-full">
                  <Text className="text-center font-bold">Dinner</Text>
                </View>
              )}

              {menuForDate.items
                .filter(
                  (item: { mealType: string }) => item.mealType == "dinner"
                )
                .map((item: { type: any; name: any }, index: any) => (
                  <CreateMeal key={index} type={item.type} name={item.name} />
                ))}
            </View>
          </View>
        ) : (
          <View>
            <Text className="text-xs text-center text-gray-400">No Menu</Text>
            <Text className="text-sm text-center text-gray-400">
              Tap to add menu
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}
