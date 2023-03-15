import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

import { useClipboard } from '@stacks/ui';
import get from 'lodash.get';

import { useAnalytics } from '@app/common/hooks/analytics/use-analytics';
import { useCurrentAccountIndex } from '@app/store/accounts/account';
import { useBtcNativeSegwitAccountIndexAddressIndexZero } from '@app/store/accounts/blockchain/bitcoin/native-segwit-account.hooks';

import { ReceiveBtcModalWarning } from './components/receive-btc-warning';
import { ReceiveTokensLayout } from './components/receive-tokens.layout';

export function ReceiveBtcModal() {
  const analytics = useAnalytics();
  const { state } = useLocation();

  const currentAccountIndex = useCurrentAccountIndex();
  const accountIndex = get(state, 'accountIndex', currentAccountIndex);

  const activeAccountBtcAddress = useBtcNativeSegwitAccountIndexAddressIndexZero(accountIndex);
  const btcAddress = get(state, 'btcAddress', activeAccountBtcAddress);

  const { onCopy } = useClipboard(btcAddress);

  function copyToClipboard() {
    void analytics.track('copy_btc_address_to_clipboard');
    toast.success('Copied to clipboard!');
    onCopy();
  }

  return (
    <ReceiveTokensLayout
      address={btcAddress}
      onCopyAddressToClipboard={copyToClipboard}
      title="Bitcoin address"
      warning={<ReceiveBtcModalWarning accountIndex={accountIndex} />}
      hasSubtitle={false}
    />
  );
}
