import { Text, View, Image, StyleSheet, ScrollView, SafeAreaView } from 'react-native';

import moment from 'moment';
import { useState } from 'react';


export default function HomeScreen() {
  const currentDate = moment();
  const startOfWeek = currentDate.clone().startOf('week');
  const [date, setDate] = useState("");
  const [nextDate, setNextDate] = useState("");
  const [selectedDate, setSelectedDate] = useState("")

  const renderWeeksDates = (startOfweek: any) => {
    let weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = startOfweek.clone().add(i, 'days');
      const formattedDate = date.format("ddd DD");
      const isCurrentDate = date.isSame(currentDate, 'days')

      weekDates.push(
        <View className='flex-row gap-5 m-2 w-full'>
          <View className='h-10 w-10 bg-gray-400 rounded-xl  justify-center items-center'>
            <Text>
              {date.format("DD")}
            </Text>
            <Text style={{ fontSize: 11, fontWeight: 500, color: isCurrentDate ? "white" : "black" }}>
              {date.format("ddd")}
            </Text>
          </View>

          <View className=' bg-gray-300 rounded-xl p-4'>
            <Text>There is no menu</Text>
          </View>
        </View>
      )
    }
    return weekDates;
  }

  const renderWeeks = (numWeeks: any) => {
    let weeks = [];
    for (let i = 0; i < numWeeks; i++) {
      let te =
        weeks.push(
          <View>
            <Text>
              {startOfWeek.clone().add(i * 7, "days").format("DD MMM")}
            </Text>
            <Text>{renderWeeksDates(startOfWeek.clone().add(i * 7, "days"))}</Text>
          </View>
        )
    }
    return weeks;
  }


  return (
    <SafeAreaView>
      <ScrollView>
        <View className="flex p-5">
          {renderWeeks(3)}
        </View>

      </ScrollView>

    </SafeAreaView>
  );
}