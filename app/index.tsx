import { Text, View, ScrollView, SafeAreaView } from "react-native";
import moment from "moment";
import { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import axios from "axios";
import MenuCard from "@/components/MenuCard";
import BottomSheet from "@/components/BottomSheet";

export default function HomeScreen() {
  const currentDate = moment();
  const startOfWeek = currentDate.clone().startOf("week");
  const [menuData, setMenuData] = useState([]);
  const [selectedDateToDelete, setSelectedDateToDelete] = useState();
  const [showModal, setShowModal] = useState(false);

  const fetchAllMenuData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/menu/all");
      setMenuData(response.data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    fetchAllMenuData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchAllMenuData();
    }, [])
  );

  const OnDeletePressed = (dateToDelete: any) => {
    setSelectedDateToDelete(dateToDelete.date);
    setShowModal(true);
  };

  const deleteItemsByDate = async () => {
    try {
      const dateToDelete = selectedDateToDelete;
      const response = await axios.delete(
        `http://localhost:3000/deleteItems/${dateToDelete}`
      );

      if (response.status == 200) {
        setShowModal(false);
        fetchAllMenuData();
      } else {
        console.log("Failed to delete the menu");
      }
    } catch (error) {
      console.log("Errror", error);
    }
  };

  const renderWeeksDates = (startOfweek: any) => {
    let weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = startOfweek.clone().add(i, "days");
      const formattedDate = date.format("ddd DD");
      const isCurrentDate = date.isSame(currentDate, "days");

      const menuForDate = menuData.find(
        (menu: { date: string }) => menu.date == formattedDate
      );

      weekDates.push(
        <MenuCard
          key={date}
          date={date}
          menuForDate={menuForDate}
          isCurrentDate={isCurrentDate}
          onDeletePressed={() => OnDeletePressed(menuForDate)}
        />
      );
    }
    return weekDates;
  };

  const renderWeeks = (numWeeks: any) => {
    let weeks = [];
    for (let i = 0; i < numWeeks; i++) {
      let te = weeks.push(
        <View key={i}>
          <Text>
            {renderWeeksDates(startOfWeek.clone().add(i * 7, "days"))}
          </Text>
        </View>
      );
    }
    return weeks;
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="flex p-5">{renderWeeks(3)}</View>
      </ScrollView>
      <BottomSheet
        showModal={showModal}
        setShowModel={setShowModal}
        dateToDelete={selectedDateToDelete}
        deleteCall={deleteItemsByDate}
      />
    </SafeAreaView>
  );
}
