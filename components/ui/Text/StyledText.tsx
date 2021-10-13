import React, {
    FunctionComponent
} from 'react'
import { FormattedMessage } from 'react-intl'
  
interface TextProps {
    id: string,
    params?: any
}
  
const StyledText: FunctionComponent<TextProps> = ({
    id,
    params
}) => {
    
    return (
      <FormattedMessage id={id} values={params} />
    )
  }
  
export default React.memo(StyledText)
  