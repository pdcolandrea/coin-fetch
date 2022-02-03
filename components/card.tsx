import React, { Dispatch, SetStateAction, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { Button, Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface OptionCardProps {
  title: string;
  body?: string;
  onPress?: () => void;
  setQuery?: Dispatch<SetStateAction<string>>;
  custom?: boolean;
}

const OptionCard = ({
  title,
  body,
  custom,
  setQuery,
  onPress,
}: OptionCardProps) => {
  const [tempValue, setTempValue] = useState('');

  const onEnterPress = () => {
    if (setQuery) {
      setQuery(tempValue);
    }
  };

  if (custom) {
    return (
      <Card>
        <Card.Title>{title}</Card.Title>
        <Card.Divider />
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <TextInput
              placeholder="Enter Contract Address"
              onChangeText={setTempValue}
              value={tempValue}
              maxLength={42}
              style={{width: "90%"}}
            />
            <TouchableOpacity onPress={() => setTempValue("")}>
              <Image source={require("../assets/images/x_icon.png")} style={{height: 20, width: 20}} />
            </TouchableOpacity>
          </View>
          <Button title="Enter" onPress={onEnterPress} />
        </View>
      </Card>
    );
  }
  return (
    <TouchableOpacity onPress={onPress}>
      <Card>
        <Card.Title>{title}</Card.Title>
        <Card.Divider />
        <View>
          <Text>{body}</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default OptionCard;
