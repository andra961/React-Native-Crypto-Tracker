import React, {memo} from 'react';
import {View, Text, Pressable} from 'react-native';
import COLORS from '../../../../constants/colors';

const FilteredComponent = ({
  filterDay,
  filterText,
  selectedRange,
  setSelectedRange,
}: {
  filterDay: string;
  filterText: string;
  selectedRange: string;
  setSelectedRange: (arg: string) => void;
}) => {
  const isFilterSelected = (filter: string) => filter === selectedRange;

  return (
    <Pressable
      style={{
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: isFilterSelected(filterDay)
          ? COLORS.GREY
          : 'transparent',
      }}
      onPress={() => setSelectedRange(filterDay)}>
      <Text
        style={{
          color: isFilterSelected(filterDay)
            ? COLORS.PRIMARY
            : COLORS.DEFAULT_GREY,
        }}>
        {filterText}
      </Text>
    </Pressable>
  );
};

export default memo(FilteredComponent);
